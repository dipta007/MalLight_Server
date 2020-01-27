import pickle
import pandas as pd
import numpy as np
import platform
import os
import subprocess

WINDOW_SIZE = 10


def get_result(pssm, species):
    protein = ""
    for val in pssm[2:]:
        if len(val.split()) == 0:
            break
        protein += val.split()[1]

    features = get_features(pssm, len(protein))

    sc = pickle.load(open('./{}-sc.pickle'.format(species), 'rb'))
    pssm = sc.transform(features)
    clf = pickle.load(open('./{}-clf.pickle'.format(species), 'rb'))
    Y = clf.predict(pssm)

    return Y[0]


def get_all_results(all_pssm, protein, species):
    predict = ""
    for pssm in all_pssm:
        now = get_result(pssm, species)
        if now == 1:
            predict += "1"
        else:
            predict += "0"

    res = ''
    ind = 0
    for p in protein:
        if p == 'K':
            res += predict[ind]
            ind += 1
        else:
            res += '2'

    return '{}\n{}'.format(protein, res)


def get_PSSM_for_this_ind(protein_sz, ind, PSSMs):
    PSSM_list = []

    PSSMs = PSSMs[2:]
    for val in range(ind - WINDOW_SIZE, ind + WINDOW_SIZE + 1):
        now = val
        if val < 0 or val >= protein_sz:
            distance = ind - val
            now = ind + distance

        row = list(map(int, PSSMs[now].strip().split()[2:2 + 20]))
        PSSM_list.append(row)

    return PSSM_list


def get_features(pssm, protein_sz):
    all_features = []
    for (ind, line) in enumerate(pssm[2:]):
        now = line.split()
        if ind >= protein_sz:
            break
        if now[1] == 'K':
            pssm_now = get_PSSM_for_this_ind(protein_sz, ind, pssm)
            now_feature = get_feature(pssm_now)
            all_features.append(now_feature)

    return all_features


def get_feature(pssm):
    data = pssm

    df = pd.DataFrame(data)

    XX = np.asarray(df)
    YY = np.ascontiguousarray(XX, dtype=np.int32)

    Transpose = YY.transpose()  # transpose pssm matrix [20*L]

    M = np.zeros([Transpose.shape[0], Transpose.shape[1]])

    for i in range(Transpose.shape[0]):
        for j in range(Transpose.shape[1]):
            M[i, j] = (Transpose[i, j] - np.mean(Transpose[i, :])) / np.std(Transpose[i, :])

    transpose_M = M.transpose()

    result = np.dot(M, transpose_M)

    lower_tril = np.tril(result)

    il1 = np.tril_indices(20)
    remove_upper_value = lower_tril[il1]

    Vector = np.ravel(remove_upper_value)

    array_vec = np.array(Vector)
    return array_vec


def get_pssm(protein):
    f = open("./gen_pssm/now.fsa", "w")
    k = 0
    for j in range(0, len(protein)):
        if protein[j] == "K":
            f.write(">")
            strr = str(k)
            f.write(strr)
            f.write("\n")
            downstream = j - 10
            upstream = j + 10
            # k=0
            while downstream <= upstream:
                f.write(protein[downstream])
                downstream = downstream + 1
            f.write("\n")
            k = k + 1
    f.close()

    os.chdir('{}/gen_pssm'.format(os.getcwd()))

    files = [f for f in os.listdir('.') if os.path.isfile(f)]
    for file in files:
        if file.startswith('psiblast') or file.startswith('makeblastdb') or file == 'now.fsa':
            continue
        os.remove(file)

    makeblastdb = "./makeblastdb_{} -in now.fsa -dbtype prot -parse_seqids -out newdatabase -title 'newdb'".format(platform.system())
    MyOut = subprocess.Popen(makeblastdb.split(), stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    stdout, stderr = MyOut.communicate()
    # print(stdout)
    if stderr is not None:
        print(stderr)

    psiblast = "./psiblast_{} -query now.fsa -db newdatabase -num_iterations=3 -evalue=0.001 -pseudocount=1 -out now.txt -out_ascii_pssm=PSSM -save_each_pssm".format(platform.system())
    MyOut = subprocess.Popen(psiblast.split(), stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    stdout, stderr = MyOut.communicate()
    # print(stdout)
    if stderr is not None:
        print(stderr)

    files = [f for f in os.listdir('.') if os.path.isfile(f) and f.startswith('PSSM.')]
    all_pssm = []
    for file in files:
        with open('./{}'.format(file), 'r') as f:
            lines = f.readlines()
            lines = lines[1:24]
            all_pssm.append(lines)

    os.chdir("..")
    return all_pssm



from flask import Flask
from flask import request
import platform
from utility import get_all_results, get_pssm
from flask_cors import CORS


psiblast = "psiblast_{}".format(platform.system())

app = Flask(__name__)
CORS(app)


@app.route('/get_malonylation', methods=['GET', 'POST'])
def get_mal():
    data = request.get_json()
    fasta = data["fasta"].split('\n')
    if len(fasta) < 2:
        fasta = data["fasta"].split(' ')
    protein = fasta[1]
    print(protein)
    pssms = get_pssm(protein)
    res = get_all_results(pssms, protein, data['species'])
    return res


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=4774)

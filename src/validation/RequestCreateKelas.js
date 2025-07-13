import validator from 'validator';

export default async function RequestCreateKelas(data){
	let message = {}
	let status = false
	let Fields = ['nama_kelas','mata_pelajaran']
    
	for (let field of Fields) {
        if (!data.hasOwnProperty(field)) {
            return {
                status: false,
                message: `Field ${field} is required`
            };
        }
    }
}
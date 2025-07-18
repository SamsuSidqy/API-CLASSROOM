import validator from 'validator';

export default async function RequestCreateKelas(data){
	let message = {}
	let status = false
	let Fields = ['nama_kelas','mata_pelajaran']
    
	for (let field of Fields) {
        if (!data.hasOwnProperty(field)) {
            return {
                status: false,
                message: `Field ${field} is required and cannot be empty`
            };
        }else if (validator.isEmpty(data[field].trim())) {
            return {
                status: false,
                message: `Field ${field} is Cannot Be Empty`
            };
        }
    }
    return {
        status:true,
        message:null
    }
}
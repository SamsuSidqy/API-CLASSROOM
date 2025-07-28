import validator from 'validator';

export default async function RequestUpdateProfile(data){
	let message = {}
	let status = false
	let Fields = ['username']
    
	
    const newData = Object.assign({}, data)

    const missingFields = Fields.filter(field => !newData.hasOwnProperty(field))
    if (missingFields.length > 0) {
        return {
            status: false,
            message: `Missing required fields: ${missingFields.join(', ')}`
        }
    }
    const emptyFields = Fields.filter(field => validator.isEmpty(newData[field].trim()))
    if (missingFields.length > 0) {
        return {
            status: false,
            message: `Fields ${missingFields.join(', ')} Cannot Be Empty`
        }
    }
    return {
        status:true,
        message:null
    }
}

export default function GenerateKodeKelas() {
    let length = 6;
    const characters = "ABCDEFGHIJKLMNOPQRSTUFWXYZ12345";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}

let condition = {
    login : (username,password) => {
        if (username !== undefined && password !== undefined){
            if (username !== "" && password !== ""){
                return true
            } else{
                return false
            }
        } else {
            return false;
        }
    },
    register : (email,username,password) => {
        if (email !== undefined && username !== undefined && password !== undefined){
            if (email !== "" && username !== "" && password !== ""){
                return true
            } else{
                return false
            }
        } else {
            return false;
        }
    },
    farmname : (name) => {
        if (name !== undefined ){
            if (name !== "" ){
                return true
            } else{
                return false
            }
        } else {
            return false;
        }
    },
    farmnid : (farm_id) => {
        if (farm_id !== undefined ){
            if (farm_id !== "" ){
                return true
            } else{
                return false
            }
        } else {
            return false;
        }
    }
    // result :
}

export default condition
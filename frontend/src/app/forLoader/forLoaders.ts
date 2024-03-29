import { redirect } from "react-router-dom";
import { AxiosError} from "axios";
import { inArray } from "../../shared/operators/operators";
import axios from "axios";


export function dataHandler(responce: any){
    if (!(responce instanceof AxiosError)){
        return responce
    }

    const messageError = responce?.response?.data?.detail;
    //console.log(inArray(['Учетные данные не были предоставлены.', 'Недопустимый токен.'], messageError));
    if (inArray(['Учетные данные не были предоставлены.', 'Недопустимый токен.'], messageError)){
        return redirect('/')
    }
    else{
        responce.message = messageError;
        throw responce;
    }
}

export async function sendDefaultPostRequest(url: string){
    const responce = await axios.post(url)
    .then((input) => input.data)
    .catch((error) => error);

    return responce
}
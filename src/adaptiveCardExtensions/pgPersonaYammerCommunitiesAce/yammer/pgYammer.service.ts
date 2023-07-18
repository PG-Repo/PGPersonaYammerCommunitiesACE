import { AdaptiveCardExtensionContext } from '@microsoft/sp-adaptive-card-extension-base';

import axios from "axios";
import { parameters } from '../ConstantParameters';

// fetching the api for getGroups, of the current User by passing the access token.

export const  getGroups=async(context:AdaptiveCardExtensionContext,aadtoken:string)=>{

  // const userId = await getUserId(context,aadtoken);

  const reqHeaders = {
      "content-type": "application/json",
      "Authorization": `Bearer ${aadtoken}`
  };

  return axios.get(parameters.getCurrentUserGroup, { headers: reqHeaders });

}






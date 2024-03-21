import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserHelper {
    mapUserData(serviceData: any) {
        // console.log("8-------", serviceData);
        let template:any = []
        serviceData.forEach((element: any) => {
            template.push({
                firstName: element?.firstName ? element?.firstName : '',
                lastName:element?.lastName ? element?.lastName : '',
                labelName:element?.labelName ? element?.labelName : '',
                phoneNumber:element?.phoneNumber ? element?.phoneNumber : '',
                email:element?.email ? element?.email : '',
                companyIds:element?.companyIds ? element?.companyIds :'',
                id:element?._id ? element._id : '',
                roleId:element?.roleId ? element.roleId : '',
             })
        });
        return template;
    }
}
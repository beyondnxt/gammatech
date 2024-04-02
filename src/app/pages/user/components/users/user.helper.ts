import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserHelper {
    mapUserData(serviceData: any) {
        let template:any = []
        serviceData.forEach((element: any) => {
            template.push({
                firstName: element?.firstName ? element?.firstName : '',
                lastName:element?.lastName ? element?.lastName : '',
                labelName:element?.labelName ? element?.labelName : '',
                phoneNumber:element?.phoneNumber ? element?.phoneNumber : '',
                email:element?.email ? element?.email : '',
                id:element?.id ? element.id : '',
                roleName:element?.roleName ? element.roleName : '',
                status:element?.status ? element.status : '',
                roleId:element?.roleId ? element.roleId : '',
             })
        });
        return template;
    }
}
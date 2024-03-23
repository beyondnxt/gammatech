import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RoleHelper {
    mapUserData(serviceData: any) {
        let template:any = []
        serviceData.forEach((element: any) => {
            template.push({
                name: element?.name ? element?.name : '',
                description: element?.description ? element?.description : '',
                dashboard: element?.menuAccess?.dashboard ? element?.menuAccess?.dashboard : '',
                user: element?.menuAccess?.user ? element?.menuAccess?.user: '',
                role: element?.menuAccess?.role ? element?.menuAccess?.role: '',
                workOrder: element?.menuAccess?.workOrder ? element?.menuAccess?.workOrder: '',
                toteBox: element?.menuAccess?.toteBox ? element?.menuAccess?.toteBox: '',
                barcode: element?.menuAccess?.barcode ? element?.menuAccess?.barcode: '',
                id:element?.id ? element.id : ''
            })
        });
        return template;
    }
}
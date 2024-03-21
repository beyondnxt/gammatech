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
                inventory: element?.menuAccess?.inventory ? element?.menuAccess?.inventory: '',
                inward: element?.menuAccess?.inward ? element?.menuAccess?.inward: '',
                company: element?.menuAccess?.company ? element?.menuAccess?.company: '',
                product: element?.menuAccess?.product ? element?.menuAccess?.product: '',
                role: element?.menuAccess?.role ? element?.menuAccess?.role: '',
                dispatch: element?.menuAccess?.dispatch ? element?.menuAccess?.dispatch: '',
                id:element?._id ? element._id : ''
            })
        });
        return template;
    }
}
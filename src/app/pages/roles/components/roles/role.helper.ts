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
                unload: element?.menuAccess?.unload ? element?.menuAccess?.unload: '',
                toteBox: element?.menuAccess?.toteBox ? element?.menuAccess?.toteBox: '',
                completed: element?.menuAccess?.completed ? element?.menuAccess?.completed: '',
                id:element?.id ? element.id : ''
            })
        });
        return template;
    }
}
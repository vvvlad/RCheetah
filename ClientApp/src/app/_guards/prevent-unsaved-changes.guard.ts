import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EditUserComponent } from '../user/edit-user/edit-user.component';


@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<EditUserComponent> {
    canDeactivate(component: EditUserComponent) {
        if (component.updateForm.dirty) {
            return confirm ('If you continue any unsaved changes will be lost!');
        }
        return true;
    }
}

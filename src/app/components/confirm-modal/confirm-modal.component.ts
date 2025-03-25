import { Component, EventEmitter, Input, Output } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})

export class ConfirmModalComponent {
  @Input() modalId: string = '';
  @Input() title: string = '';
  @Input() message: string = '';
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  public hovered: boolean = false;

  constructor() {}

  open(): void {
    console.log(this.modalId);
    const myModal = document.getElementById(this.modalId);
    if (myModal) {
      var bootstrapModal = new bootstrap.Modal(myModal);
      bootstrapModal.show();
    }
  }

  close(): void {
    const myModal = document.getElementById(this.modalId);
    if (myModal) {
      const bootstrapModal = bootstrap.Modal.getInstance(myModal) || new bootstrap.Modal(myModal);
      bootstrapModal.hide();
    }
  }

  onConfirm(): void {
    this.confirm.emit();
  }


}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-noticia',
  templateUrl: './modal-noticia.component.html',
  styleUrl: './modal-noticia.component.css'
})
export class ModalNoticiaComponent {
  descripcionForm: FormGroup;

  @Input() isOpen: boolean = false;
  @Input() idJuego: number | null = null;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() submitForm = new EventEmitter<any>();



  constructor(private fb: FormBuilder) {
    this.descripcionForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  close() {
    this.closeModal.emit(false); // Se notifica al componente padre para cerrar el modal
  }

  onSubmit() {
    if (this.descripcionForm.valid) {
      
      const noticiaData = { ...this.descripcionForm.value, juego_id: this.idJuego };

      console.log(this.descripcionForm.value);
      this.submitForm.emit(noticiaData);
      this.close();
    } else {
      console.log("Formulario INVALIDO")
    }
  }
}

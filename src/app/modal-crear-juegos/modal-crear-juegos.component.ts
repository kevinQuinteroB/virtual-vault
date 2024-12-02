import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-crear-juegos',
  templateUrl: './modal-crear-juegos.component.html',
  styleUrls: ['./modal-crear-juegos.component.css']
})
export class ModalCrearJuegosComponent {
  gameForm: FormGroup;

  @Input() isOpen: boolean = false;
  @Input() id: number | null = null;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() submitForm = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.gameForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      portada: ['', [Validators.required, Validators.pattern('https?://.+')]],
      link: ['', [Validators.required, Validators.pattern('https?://.+')]],
      fecha_lanzamiento: ''
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Cada vez que 'isOpen' cambie (es decir, cuando el modal se abre), se resetean los campos
    if (changes['isOpen'] && this.isOpen) {
      this.resetForm();
    }
  }

  resetForm() {
    this.gameForm.reset({
      nombre: '',
      descripcion: '',
      portada: '',
      link: '',
      fecha_lanzamiento: ''
    });
  }

  onSubmit() {
    if (this.gameForm.valid) {
      let fechaLanzamiento = this.gameForm.value.fecha_lanzamiento;

      const juegoData = { ...this.gameForm.value, desarrollador: this.id };
      if (fechaLanzamiento && fechaLanzamiento.includes('/')) {
        fechaLanzamiento = this.convertirFecha(fechaLanzamiento);
      }

      console.log('Fecha de lanzamiento convertida:', fechaLanzamiento); // Verificar la fecha convertida

      // Ahora puedes continuar con el envío del formulario
      this.submitForm.emit(juegoData);
      this.close(); // Cerrar el modal
    } else {
      console.log('Formulario no válido');
    }
  }

  close() {
    this.closeModal.emit(false); // Se notifica al componente padre para cerrar el modal
  }

  convertirFecha(entradaFecha: string): string {
    const partes = entradaFecha.split('/'); // Dividir la fecha en partes (DD, MM, YYYY)
    const dia = partes[0];
    const mes = partes[1];
    const año = partes[2];

    // Devolver la fecha en formato YYYY-MM-DD
    return `${año}-${mes}-${dia}`;
  }
}

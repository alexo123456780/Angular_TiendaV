import { Component ,type OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ProductoServiceService } from '../../../services/producto-service.service';
import { AdminServiceService } from '../../../services/admin-service.service';
import { CategoriaServiceService } from '../../../services/categoria-service.service';
import { Categoria } from '../../../interfaces/Categoria';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TextareaModule } from 'primeng/textarea';
import { DialogModule } from 'primeng/dialog';



@Component({
  selector: 'app-productos-a',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule,InputTextModule,InputNumberModule,FloatLabelModule,CardModule,ButtonModule,
    SelectModule,MessageModule,FileUploadModule,ProgressSpinnerModule,TextareaModule,DialogModule

  ],
  templateUrl: './productos-a.component.html',
  styleUrls: ['./productos-a.component.css']
})


export class ProductosAComponent implements OnInit {

  estaCargando:boolean = false;
  mensajeExito:string = '';
  mensajeError:string = '';
  imagen_preview: string | ArrayBuffer | null = null;
  imagen_producto: File | null = null;
  datos: FormData | null = null;
  idAdmin:number | null = null;
  formularioProducto:FormGroup;
  mostrarModal: boolean = false;
  categorias: Categoria[] = [];


  constructor(private productoService:ProductoServiceService, private adminService:AdminServiceService, private fb:FormBuilder, private router:Router,private categoriaService:CategoriaServiceService){

    this.formularioProducto = this.fb.group({

      nombre_producto: ['',[Validators.required,Validators.maxLength(255)]],
      stock:['',Validators.required],
      precio_producto:['',Validators.required],
      descripcion_producto:['',[Validators.required,Validators.maxLength(255)]],
      categoria_id:['',Validators.required]

    })

  }



  ngOnInit(): void {

    this.obtenerIdAdmin();
    this.obtenerCategorias();
    
    
  }

  obtenerIdAdmin():void{

    this.idAdmin = this.adminService.obtenerIdAdmin();
  }

  limpiarMensajes():void{

    if(this.mensajeExito){

      setTimeout(() =>{

        this.mensajeExito = '';

      },1400)

    }

    if(this.mensajeError){

      setTimeout(() =>{

        this.mensajeError = '';

      },1400)
    }
  }

  obtenerImagen(event:Event):void{

    const imagenProducto = (event.target as HTMLInputElement).files?.[0];

    if(imagenProducto){

      this.imagen_producto = imagenProducto;

      const reader = new FileReader();

      reader.onload = () =>{

        this.imagen_preview = reader.result;
      }

      reader.readAsDataURL(imagenProducto);

    }

  }


  validarFormData():void{

    this.datos = new FormData();

    const nombreProducto = this.formularioProducto.get('nombre_producto')?.value;
    const stock = this.formularioProducto.get('stock')?.value;
    const precioProducto = this.formularioProducto.get('precio_producto')?.value;
    const descripcionProducto = this.formularioProducto.get('descripcion_producto')?.value;
    const categoriaId = this.formularioProducto.get('categoria_id')?.value;

    if(this.imagen_producto){

      this.datos.append('imagen_producto',this.imagen_producto);

    }

    this.datos.append('nombre_producto',nombreProducto);
    this.datos.append('stock',stock);
    this.datos.append('precio_producto',precioProducto);
    this.datos.append('descripcion_producto',descripcionProducto);
    this.datos.append('categoria_id',categoriaId);


  }


  registrarProducto():void{

    if(this.formularioProducto.valid && this.imagen_producto && this.idAdmin && this.datos){

      this.estaCargando = true;

      this.productoService.crearProducto(this.idAdmin,this.datos).subscribe({

        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Producto creado exitosamente';

          console.log(response.message);

          this.limpiarMensajes();

        },

        error:(error) =>{

          this.estaCargando = false;
          this.mensajeError = 'Error al crear el producto intentelo mas tarde porfavor';

          this.limpiarMensajes();

          console.log(JSON.stringify(error,null,3));

        }        
      })

    }
  }

  obtenerCategorias():void{

    this.categoriaService.obtenerCategorias().subscribe({

      next: (response) =>{

        if(response.data && response.data !== undefined){

          const categoriasObtenidas = response.data;

          if(categoriasObtenidas.length === 0){

            this.mensajeError = 'Aun no hay categorias disponibles';
            this.limpiarMensajes();

          }

          this.categorias = [...categoriasObtenidas];


        }
      },

      error: (error) =>{

        this.mensajeError = 'No se encontraron categorias';
        this.limpiarMensajes();

        console.log(JSON.stringify(error,null,3));


      }

    })
  }



  alertaModal():void{

    if(this.formularioProducto.valid && this.idAdmin,this.imagen_producto,this.datos){

      this.mostrarModal = true;
    }else{

      this.mensajeError = 'Complete todos los campor requeridos';
      this.mostrarModal = false;

      this.limpiarMensajes();


    }



  }

  confirmarModal():void{

    this.mostrarModal = false;
    this.registrarProducto();

  }


  rutaDashboard():void{

    this.router.navigate(['/dashboard/admin'])


  }






















}

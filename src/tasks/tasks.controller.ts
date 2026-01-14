import { Controller, Get, Post, Delete, Patch, Param, Body } from '@nestjs/common';  // É preciso importar os métodos HTTP que serão usados
import { TasksService } from './tasks.service';
import { title } from 'process';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {} // Cria a classe de serviço para as tarefas

    @Get()
    findAll() {
        return this.tasksService.findAll();
    }

    @Get(':id')
    find(@Param('id') id: string) {
        return this.tasksService.find(Number(id));  // @Param sempre retorna string, logo é preciso converter para número
    }

    @Post()
    create(@Body('title') title: string, @Body('description') description: string) {
        return this.tasksService.create(title, description);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        // As interrogações servem para não haver obrigatoriedade de preencher tal parâmetro
        @Body('title') title?: string,
        @Body('description') description?: string,
        @Body('completed') completed?: string){
            return this.tasksService.update(Number(id), title, description, completed);
        }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tasksService.remove(Number(id));
    }
}

// Nota: Lembre que @Param pega informações da rota URL da requisição
//       @Body pega informações do corpo JSON da requisição

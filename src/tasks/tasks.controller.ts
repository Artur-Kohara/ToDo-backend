import { Controller, Get, Post, Delete, Patch, Param, Body, Query } from '@nestjs/common';  // É preciso importar os métodos HTTP que serão usados
import { TasksService } from './tasks.service';
import { title } from 'process';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {} // Cria a classe de serviço para as tarefas

    @Get()
    findAll(@Query('completed') completed?: string) {
        return this.tasksService.findAll(
            // Caso completed seja diferente de undefined, usa o parâmetro completed como filtro
            // Caso contrário, acha todas as tarefas
            completed !== undefined ? completed === 'true' : undefined
        );
    }

    @Post()
    create(@Body('title') title: string) {
        return this.tasksService.create(title);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body('completed') completed: boolean) {
        return this.tasksService.update(Number(id), completed);
    }

    @Delete()
    removeAll(@Query('completed') completed?: string) {
        if (completed !== undefined) {
            return this.tasksService.removeCompleted(completed === 'true');
        }
        return this.tasksService.removeAll();
    }
}

// Nota: Lembre que @Param pega informações da rota URL da requisição
//       @Body pega informações do corpo JSON da requisição

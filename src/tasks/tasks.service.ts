/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable()
export class TasksService {
    //Inclui um constructor para usar o prisma como banco de dados
    constructor (private prisma: PrismaService) {}

    // Utiliza funções que serão criadas pelo Prisma dentro dos métodos
    // Agora não se manipula mais uma lista de tarefas diretmanete
    // O Prisma agora é o responsável por manipular os dados
    findAll(completed?: boolean) {
        return this.prisma.task.findMany({
            // Caso seja especificado que a tarefa foi completada ou não, ele usa o completed para filtrar
            // Caso contrário, ele acha todas as tarefas (é uma condicional basicamente)
            where: completed !== undefined ? {completed} : {},
        });
    }

    create(title: string) {
        return this.prisma.task.create({
            data: {title},
        });
    }

    update(id: number, completed: boolean) {
        return this.prisma.task.update({
            where: {id},
            data: {completed},
        });
    }

    removeAll() {
        return this.prisma.task.deleteMany();
    }

    removeCompleted(completed: boolean) {
        return this.prisma.task.deleteMany({
            where: {completed},
        })
    }
}

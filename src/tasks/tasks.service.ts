/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: string
}

@Injectable()
export class TasksService {
    private tasks: Task[] = []; // Cria uma lista de tarefas

    // Método para encontrar todas as tarefas criadas
    findAll() {
        return this.tasks;
    }

    find(id: number) {
        const task = this.tasks.find(t => t.id === id);
        return task;
    }

    create(title: string, description: string) {    // Os parâmetros passados como entrada são os que serão editados pelo usuário
        const task: Task = {
            id: Date.now(),
            title,
            description,
            completed: "To do"
        };
        this.tasks.push(task);  // Adiciona a tarefa à lista de tarefas  
        return task;                      
    }

    update(id: number, title?: string, description?: string, completed?: string) {  // As interrogações servem para não haver obrigatoriedade de preencher tal parâmetro
        const task = this.tasks.find(t => t.id === id);    // Acha uma tarefa pelo id para editá-la
        if (!task) return null;

        // As condicionais servem para salvar os valores antigos dos parâmetros caso eles não sejam atualizados
        if (title !== undefined){
            task.title = title;
        }
        
        if (description !== undefined){
            task.description = description;
        }

        if (completed !== undefined){
            task.completed = completed;
        }    

        return task;
    }

    remove(id: number) {
        this.tasks = this.tasks.filter(t => t.id !== id)    // Filtra a lista de tarefas excluindo a tarefa com o id especificado
    }
}

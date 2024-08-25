class CreateTaskInputDto {
  name: string;
  listId: string;
  completed?: boolean = false;
}
class UpdateTaskInputDto {
  id: string;
  name: string;
  completed: boolean;
}
export { CreateTaskInputDto, UpdateTaskInputDto };

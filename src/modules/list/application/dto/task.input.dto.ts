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
class ListingTaskInputDto {
  listId: string;
}
class DeleteTaskInputDto {
  id: string;
}

export {
  CreateTaskInputDto,
  DeleteTaskInputDto,
  ListingTaskInputDto,
  UpdateTaskInputDto,
};

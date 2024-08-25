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
export { CreateTaskInputDto, ListingTaskInputDto, UpdateTaskInputDto };

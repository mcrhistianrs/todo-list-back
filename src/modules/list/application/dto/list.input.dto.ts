class CreateListInputDto {
  id?: string;
  name: string;
  color: string;
  createdAt?: Date | string;
  user: string;
}
class ListAllListsInputDto {
  id: string;
}
class UpdateListInputDto {
  id: string;
  name: string;
  color: string;
}
export { CreateListInputDto, ListAllListsInputDto, UpdateListInputDto };

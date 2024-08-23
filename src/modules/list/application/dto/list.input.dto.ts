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
export { CreateListInputDto, ListAllListsInputDto };

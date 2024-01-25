export interface IEmployee {
  name: string;
  attributes: {
    id: number;
    managerId: number | null;
    position: string;
    bio: string;
    profilePic: string;
  };
}

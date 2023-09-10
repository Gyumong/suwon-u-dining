export interface DietInfo{
  company: string;
  commonMenu: string[];
  mainMenu: string[];
  mealType: string;
  restaurantType: string;
}

export interface ApiResponse {
  status: number;
  result: {
    dateAndTypeDietInfo: DietInfo[];
  };
}
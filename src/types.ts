export interface MongoDoc
{
  data: Record<string, any> // Gives access to Document
  update: () => Promise<any> // Gives access to update Method
  changeStream: any // Gives access to mongodb Collection Changestream

}

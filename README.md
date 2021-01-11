# Trinity Backend

### Running the Project

`serverless invoke local --function getForms`

`serverless invoke local --function addForm --path data.json`

`data.json`:
```
{
  email: "email",
  firstName: "firstName",
  lastName: "lastName",
  website: "example.com",
  phoneNumber: "123-456-7890"
}
```
### Building/Deploying the Project

`serverless deploy`
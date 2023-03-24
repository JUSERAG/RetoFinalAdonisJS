import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/v1/login', 'UsersController.loginUser')
Route.post('/api/v1/user/createAdmin', 'UsersController.createAdmin')

Route.group(() => {

  Route.group(() => {
    Route.post('/create', 'UsersController.createUser')
    Route.get('/getUsers', 'UsersController.getUsers')
    Route.get('/getUser/:id', 'UsersController.getUser')
    Route.put('/update/:id', 'UsersController.updateUser')
    Route.delete('/delete/:id', 'UsersController.deleteUser')
    Route.post('/state/:id', 'UsersController.stateUser')
  }).prefix('/user').middleware('Admin')

  Route.group(() => {
    Route.post('/create','QuestionsController.createQuestion')
    Route.get('/getQuestions','QuestionsController.getQuestions')
    Route.put('/updateQuestion/:id', 'QuestionsController.updateQuestion')
    Route.delete('/deleteQuestion/:id', 'QuestionsController.deleteQuestion')
    Route.post('/stateQuestion/:id', 'QuestionsController.stateQuestion')

    Route.get('/getOptions/:id','AnswersController.getOptionQuestion')
    Route.put('/updateAnswer/:id', 'AnswersController.updateAnswer')
  }).prefix('/questions').middleware('Admin')

  Route.group(() => {
    Route.post('/create','TypeDocumentsController.createTypeDocument')
    Route.get('/getTypeDocuments','TypeDocumentsController.getTypeDocuments')
    Route.put('/update/:id', 'TypeDocumentsController.updateTypeDocument')
    Route.delete('/delete/:id', 'TypeDocumentsController.deleteTypeDocument')
  }).prefix('/typeDocument').middleware('Admin')
 
  Route.group(() => {
    Route.post('/create','RolesController.createRole')
    Route.get('/getRoles','RolesController.getRoles')
    Route.put('/update/:id', 'RolesController.updateRole')
    Route.delete('/delete/:id', 'RolesController.deleteRole')
  }).prefix('/role').middleware('Admin')

  Route.group(() => {
    Route.get('/getQuestions', 'FormsController.getForms')
    Route.post('/postQuestions', 'FormsController.createForm')
  }).prefix('form').middleware('Student')

}).prefix('/api/v1').middleware('General')

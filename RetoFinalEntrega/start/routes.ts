import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/v1/login', 'UsersController.loginUser')

Route.group(() => {

  Route.group(() => {
    Route.post('/create', 'UsersController.createUser')
    Route.get('/getUsers', 'UsersController.getUsers')
    Route.get('/getUser/:id', 'UsersController.getUser')
    Route.put('/update/:id', 'UsersController.updateUser')
    Route.delete('/delete/:id', 'UsersController.deleteUser')
  }).prefix('/user')

  Route.group(() => {
    Route.post('/create','QuestionsController.createQuestion')
    Route.get('/getQuestions','QuestionsController.getQuestions')
    Route.put('/update/:id', 'QuestionsController.updateQuestion')
    Route.delete('/delete/:id', 'QuestionsController.deleteQuestion')

    Route.get('/getOptions/:id','AnswersController.getOptionQuestion')
    Route.put('/updateAnswer/:id', 'AnswersController.updateAnswer')
  }).prefix('/questions').middleware('Admin')

  Route.group(() => {
    Route.post('/create','TypeDocumentsController.createTypeDocument')
    Route.get('/getTypeDocuments','TypeDocumentsController.getTypeDocuments')
    Route.put('/update/:id', 'TypeDocumentsController.updateTypeDocument')
    Route.delete('/delete/:id', 'TypeDocumentsController.deleteTypeDocument')
  }).prefix('/typeDocument')
 
  Route.group(() => {
    Route.post('/create','RolesController.createRole')
    Route.get('/getRoles','RolesController.getRoles')
    Route.put('/update/:id', 'RolesController.updateRole')
    Route.delete('/delete/:id', 'RolesController.deleteRole')
  }).prefix('/role')

  Route.group(() => {
    Route.get('/getQuestions/:id', 'FormsController.getForm')
    Route.get('/getQuestions', 'FormsController.getForms')
    Route.post('/postQuestions', 'FormsController.createForm').middleware('Admin')
  }).prefix('form').middleware('Student')

}).prefix('/api/v1')

// I think this is for the todo collection. But the tutorial is simply calling it AppView

var app = app || {};

// The Application

// Our overall AppView is the top-level piece of UI
// global..
app.AppView = Backbone.View.extend({
  // Instead of generating a new element, bind to the existing skeleton of the App already present in the HTML. #todoapp is a <section> within index.html.
  el: '#todoapp',

  // our template for the line of statistics at the bottom of the app
  statsTemplate: _.template($('#stats-template').html()),

  // when initialized, bind the relevant events on the 'todos' collection, when items are added or changed. What exactly is this doing?
  initialize: function(){
    this.allCheckbox = this.$('#toggle-all')[0];
    // the same as writing:
    // this.$input = app.AppView.$('#new-todo')
    // Codeschool mentioned Backbone has a better built-in that doesn't rely on using the ID. Might look like this:
    // $this.$input = this.$el.html();
    this.$input = this.$('#new-todo');
    this.$footer = this.$('#footer');
    this.$main = this.$('#main');

    // two event listeners. note that we're only binding add and reset to the collection (app). We're going to delegate update and delete to the TodoView (model)

    // is this a replacement for something like
    // this.collection.on('add', this.addOne, this) ??

    // answer: listenTo() sets the callback's context to the view when it creates the binding
    this.listenTo(app.Todos, 'add', this.addOne);
    this.listenTo(app.Todos, 'reset', this.addAll);
  },

  // add a single todo item to the list by creating a view for it, and appending its element to the #todo-list <ul>. How does this know to create a <li>? Maybe because append knows..
  addOne: function( todo ){
    var view = new app.TodoView({ model: todo });
    $('#todo-list').append( view.render().el );
  },

  // add all items in the Todos collection at once
  addAll: function(){
    this.$('#todo-list').html('')
    app.Todos.each(this.addOne,this)
  }
aa
})
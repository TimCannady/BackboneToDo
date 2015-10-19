var app = app || {};

// not sure why this file is called todos.js since I think it's just for an individual model. Seems it should be called todo.js - singular. Better yet, todo_view.js

app.TodoView = Backbone.View.extend({

  tagName: 'li',

  template: _.template( $('#item-template').html()),

  events: {
    'click .toggle': 'togglecompleted',
    'dblclick label': 'edit',
    'click .destroy': 'clear',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close'
  },

  // listeners
  // what is this.model? how is it connected?
  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
    // this.remove deletes the view and automatically removes the associated element from the DOM. Since we used listenTo to bind the view's listeners to its model, this.remove also unbinds the listening callbacks from the model ensuring that a memory leak does not occur
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'visible', this.toggleVisible)
  },

  render: function(){
    // the line below uses Underscore's template() method to create an HTML fragment using the attributes from the model that were passed upon instantiating the view. Next, it replaces the content of the view's element, being an <li>!
    this.$el.html( this.template( this.model.attributes));

    // is toggleClass() a built-in?
    this.$el.toggleClass('completed', this.model.get('completed'))
    this.toggleVisible()

    // this.$input means the user's input which is entered into the html input with the .edit class. I'm not sure why we need to cache it here, though.
    this.$input = this.$('.edit');
    return this
  },

  // toggles visibility of the item
  toggleVisible: function(){
    this.$el.toggleClass( 'hidden', this.isHidden())
  },

  // determines if the item should be hidden
  isHidden: function(){
    var isCompleted = this.model.get('completed');
    return (  // hidden cases only
      (!isCompleted && app.TodoFilter === 'completed') || (isCompleted && app.TodoFilter === 'active')
      )
  },

  // toggle the 'completed' state of the model
  togglecompleted: function(){
    this.model.toggle()
  },

  edit: function(){
    // this.$el is the view's top level element, which is the <li>/ So this is simply adding the class 'editing' to the <li> tag
    this.$el.addClass('editing');
    // this.$input was cached earlier - it's the edit field
    this.$input.focus();
  },

  close: function(){
    // this.$input was cached earlier - it's the edit field
    // trim sanitizes the input, ensures we don't save using, say, a blank string
    var value = this.$input.val().trim();

    if(value){
      this.model.save({title: value});
    }

    this.$el.removeClass('editing');
  },

  updateOnEnter: function(e){
    if( e.which === ENTER_KEY ){
      this.close()
    }
  },

  // remove the item, destroy the model from *localStorage*. Furthermore, we had set a listener so that when this.model is destroyed, that it also removed this view from the DOM. Destroy also removes the model from the Todos collection, which triggers a remove event on the collection.

  // This also feels like we are telling the model how to destroy itself...
  clear: function(){
    this.model.destroy()
  }

});
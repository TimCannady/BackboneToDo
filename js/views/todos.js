var app = app || {};

app.TodoView = Backbone.View.extend({
  tagName: 'li',

  template: _.template( $('#item-template').html()),

  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': close
  },

  // re-render the model's view anytime the model changes
  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
  },

  render: function(){
    // the line below uses Underscore's template() method to create an HTML fragment using the attributes from the model that were passed upon instantiating the view. Next, it replaces the content of the view's element, being an <li>!
    this.$el.html( this.template( this.model.attributes));
    // this.$input means the user's input which is entered into the html input with the .edit class. I'm not sure why we need to cache it here, though.
    this.$input = this.$('.edit');
    return this
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
  }
});
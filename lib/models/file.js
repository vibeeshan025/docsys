"use strict";

var mongoose = require('mongoose');

var file = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    "default": function _default() {
      return Date.now();
    }
  },
  dated: {
    type: Date
  },
  content: {
    type: String
  },
  keywords: {
    type: [String],
    minlength: 3
  },
  ocr: {
    type: Boolean,
    "default": false
  },
  key: {
    type: Boolean,
    "default": false
  },
  fileId: {
    type: String,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    "default": []
  }],
  lockedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    "default": null
  },
  locked: {
    type: Boolean,
    "default": false
  },
  mime: {
    type: String
  },
  extension: {
    type: String
  },
  archived: {
    type: Boolean,
    "default": false
  },
  fileStorageId: String,
  log: [{
    timestamp: {
      type: Date,
      "default": function _default() {
        return Date.now();
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    logType: {
      type: String,
      required: false
    },
    message: {
      type: String,
      required: true
    }
  }]
});

var handleE11000 = function handleE11000(error, res, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('File already exists'));
  } else {
    next();
  }
};

file.post('save', handleE11000);
file.post('update', handleE11000);
file.post('findOneAndUpdate', handleE11000);
file.post('insertMany', handleE11000);
module.exports = {
  File: mongoose.model('File', file)
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvZmlsZS5qcyJdLCJuYW1lcyI6WyJtb25nb29zZSIsInJlcXVpcmUiLCJmaWxlIiwiU2NoZW1hIiwidGl0bGUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJjcmVhdGVkIiwiRGF0ZSIsIm5vdyIsImRhdGVkIiwiY29udGVudCIsImtleXdvcmRzIiwibWlubGVuZ3RoIiwib2NyIiwiQm9vbGVhbiIsImtleSIsImZpbGVJZCIsInVuaXF1ZSIsIm93bmVyIiwiVHlwZXMiLCJPYmplY3RJZCIsInJlZiIsInNoYXJlZFdpdGgiLCJsb2NrZWRCeSIsImxvY2tlZCIsIm1pbWUiLCJleHRlbnNpb24iLCJhcmNoaXZlZCIsImZpbGVTdG9yYWdlSWQiLCJsb2ciLCJ0aW1lc3RhbXAiLCJ1c2VyIiwibG9nVHlwZSIsIm1lc3NhZ2UiLCJoYW5kbGVFMTEwMDAiLCJlcnJvciIsInJlcyIsIm5leHQiLCJuYW1lIiwiY29kZSIsIkVycm9yIiwicG9zdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJGaWxlIiwibW9kZWwiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsVUFBRCxDQUF0Qjs7QUFFQSxJQUFJQyxJQUFJLEdBQUcsSUFBSUYsUUFBUSxDQUFDRyxNQUFiLENBQW9CO0FBQzlCQyxFQUFBQSxLQUFLLEVBQUU7QUFDTkMsSUFBQUEsSUFBSSxFQUFFQyxNQURBO0FBRU5DLElBQUFBLFFBQVEsRUFBRTtBQUZKLEdBRHVCO0FBSzlCQyxFQUFBQSxPQUFPLEVBQUU7QUFDUkgsSUFBQUEsSUFBSSxFQUFFSSxJQURFO0FBRVIsZUFBUztBQUFBLGFBQU1BLElBQUksQ0FBQ0MsR0FBTCxFQUFOO0FBQUE7QUFGRCxHQUxxQjtBQVM5QkMsRUFBQUEsS0FBSyxFQUFFO0FBQ05OLElBQUFBLElBQUksRUFBRUk7QUFEQSxHQVR1QjtBQVk5QkcsRUFBQUEsT0FBTyxFQUFFO0FBQ1JQLElBQUFBLElBQUksRUFBRUM7QUFE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LElBQUFBLElBQUk7QUFDSjtBQUNELENBTkQ7O0FBUUFyQyxJQUFJLENBQUN5QyxJQUFMLENBQVUsTUFBVixFQUFrQlAsWUFBbEI7QUFDQWxDLElBQUksQ0FBQ3lDLElBQUwsQ0FBVSxRQUFWLEVBQW9CUCxZQUFwQjtBQUNBbEMsSUFBSSxDQUFDeUMsSUFBTCxDQUFVLGtCQUFWLEVBQThCUCxZQUE5QjtBQUNBbEMsSUFBSSxDQUFDeUMsSUFBTCxDQUFVLFlBQVYsRUFBd0JQLFlBQXhCO0FBRUFRLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUFFQyxFQUFBQSxJQUFJLEVBQUU5QyxRQUFRLENBQUMrQyxLQUFULENBQWUsTUFBZixFQUF1QjdDLElBQXZCO0FBQVIsQ0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpXG5cbmxldCBmaWxlID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XG5cdHRpdGxlOiB7XG5cdFx0dHlwZTogU3RyaW5nLFxuXHRcdHJlcXVpcmVkOiB0cnVlLFxuXHR9LFxuXHRjcmVhdGVkOiB7XG5cdFx0dHlwZTogRGF0ZSxcblx0XHRkZWZhdWx0OiAoKSA9PiBEYXRlLm5vdygpLFxuXHR9LFxuXHRkYXRlZDoge1xuXHRcdHR5cGU6IERhdGUsXG5cdH0sXG5cdGNvbnRlbnQ6IHtcblx0XHR0eXBlOiBTdHJpbmcsXG5cdH0sXG5cdGtleXdvcmRzOiB7XG5cdFx0dHlwZTogW1N0cmluZ10sXG5cdFx0bWlubGVuZ3RoOiAzLFxuXHR9LFxuXHRvY3I6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfSxcblx0a2V5OiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlIH0sXG5cdGZpbGVJZDoge1xuXHRcdHR5cGU6IFN0cmluZyxcblx0XHR1bmlxdWU6IHRydWUsXG5cdH0sXG5cdG93bmVyOiB7XG5cdFx0dHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxuXHRcdHJlZjogJ1VzZXInLFxuXHRcdHJlcXVpcmVkOiB0cnVlLFxuXHR9LFxuXHRzaGFyZWRXaXRoOiBbXG5cdFx0e1xuXHRcdFx0dHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxuXHRcdFx0cmVmOiAnVXNlcicsXG5cdFx0XHRkZWZhdWx0OiBbXSxcblx0XHR9LFxuXHRdLFxuXHRsb2NrZWRCeToge1xuXHRcdHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcblx0XHRyZWY6ICdVc2VyJyxcblx0XHRkZWZhdWx0OiBudWxsLFxuXHR9LFxuXHRsb2NrZWQ6IHtcblx0XHR0eXBlOiBCb29sZWFuLFxuXHRcdGRlZmF1bHQ6IGZhbHNlLFxuXHR9LFxuXHRtaW1lOiB7XG5cdFx0dHlwZTogU3RyaW5nLFxuXHR9LFxuXHRleHRlbnNpb246IHtcblx0XHR0eXBlOiBTdHJpbmcsXG5cdH0sXG5cdGFyY2hpdmVkOiB7XG5cdFx0dHlwZTogQm9vbGVhbixcblx0XHRkZWZhdWx0OiBmYWxzZSxcblx0fSxcblx0ZmlsZVN0b3JhZ2VJZDogU3RyaW5nLFxuXHRsb2c6IFtcblx0XHR7XG5cdFx0XHR0aW1lc3RhbXA6IHtcblx0XHRcdFx0dHlwZTogRGF0ZSxcblx0XHRcdFx0ZGVmYXVsdDogKCkgPT4gRGF0ZS5ub3coKSxcblx0XHRcdH0sXG5cdFx0XHR1c2VyOiB7XG5cdFx0XHRcdHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcblx0XHRcdFx0cmVmOiAnVXNlcicsXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdGxvZ1R5cGU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UgfSxcblx0XHRcdG1lc3NhZ2U6IHtcblx0XHRcdFx0dHlwZTogU3RyaW5nLFxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0fSxcblx0XSxcbn0pXG5cbnZhciBoYW5kbGVFMTEwMDAgPSBmdW5jdGlvbiAoZXJyb3IsIHJlcywgbmV4dCkge1xuXHRpZiAoZXJyb3IubmFtZSA9PT0gJ01vbmdvRXJyb3InICYmIGVycm9yLmNvZGUgPT09IDExMDAwKSB7XG5cdFx0bmV4dChuZXcgRXJyb3IoJ0ZpbGUgYWxyZWFkeSBleGlzdHMnKSlcblx0fSBlbHNlIHtcblx0XHRuZXh0KClcblx0fVxufVxuXG5maWxlLnBvc3QoJ3NhdmUnLCBoYW5kbGVFMTEwMDApXG5maWxlLnBvc3QoJ3VwZGF0ZScsIGhhbmRsZUUxMTAwMClcbmZpbGUucG9zdCgnZmluZE9uZUFuZFVwZGF0ZScsIGhhbmRsZUUxMTAwMClcbmZpbGUucG9zdCgnaW5zZXJ0TWFueScsIGhhbmRsZUUxMTAwMClcblxubW9kdWxlLmV4cG9ydHMgPSB7IEZpbGU6IG1vbmdvb3NlLm1vZGVsKCdGaWxlJywgZmlsZSkgfVxuIl19
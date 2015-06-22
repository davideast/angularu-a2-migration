
function BoxService() {
  this.boxes = [{ value: 1 }];
  this.boxSubject = new Rx.ReplaySubject();
  this.boxSubject.onNext(this.boxes);
}
BoxService.prototype.add = function add() {
  this.boxes.push({ value: this.boxes.length + 1 });
  this.boxSubject.onNext(this.boxes);
};

var boxList = angular.
  Component({
    selector: 'box-list',
    properties: ['boxes']
  }).
  View({
    templateUrl: './box-list.html',
    directives: [angular.NgFor]
  }).
  Class({
    constructor: [BoxService, function(boxService) {
      this.boxService = boxService;
    }]
  });

var boxApp = angular.
  Component({
    selector: 'box-app',
    appInjector: [BoxService]
  }).
  View({
    templateUrl: './box-app.html',
    directives: [boxList]
  }).
  Class({
    constructor: [BoxService, function(boxService) {
      boxService.boxSubject.subscribe(function(boxes) {
        this.boxes = boxes;
      }.bind(this));
    }]
  });

angular.bootstrap(boxApp);

define([
    'jedate',
    'angular'
],function(jeDate){
    angular.module("angular-jedate", [])
        .directive('jedate', ['$timeout', function ($timeout) {
            
            return {
                restrict: "A",
                require:"ngModel",
                scope:{
                    'ngModel':'='
                },
                link: function (scope, element, attrs) {
                    var id = element[0].id;

                    var options = {
                        dateCell:"#" + id
                    };
                    options.minDate = attrs.minDate;//最小日期
                    options.maxDate = attrs.maxDate;//最大日期
                    // options.isClear = false;//默认不展示清空按钮
                    options.isTime = false;//默认关闭时间选择
                    options.festival = true;//默认显示节日
                    options.skinCell = attrs.skincell;//风格调用，CSS中增加了3种风格（红、绿、蓝）
                    options.format = attrs.format;//日期格式设置( YYYY-MM-DD hh:mm:ss 设置 年-月-日 时:分:秒; YYYY-MM-DD 设置 年-月-日)
                    options.clearRestore = false; //清空输入框，返回预设日期，输入框非空的情况下有效
                    options.choosefun=function(elem, val){ //选中回调
                        scope.$apply(function(){
                            scope.ngModel=val;
                        })
                    };

                    options.clearfun = function () { //清空回调
                        scope.$apply(function(){
                            scope.ngModel="";

                            //错误校验
                            errorCheck();
                        })
                    };

                    options.okfun =function(elem, val){ //确定回调
                        scope.$apply(function(){
                            scope.ngModel=val;
                        })
                    };

                    //错误校验
                    var errorCheck = function () {

                        //获取字符串长度 start
                        var jmz = {};
                        jmz.GetLength = function(str) {
                            ///获得字符串实际长度，中文2，英文1
                            ///要获得长度的字符串
                            if(angular.isUndefined(str)) {
                                return 0;
                            } else {
                                var realLength = 0, len = str.length, charCode = -1;
                                for (var i = 0; i < len; i++) {
                                    charCode = str.charCodeAt(i);
                                    if (charCode >= 0 && charCode <= 128)
                                        realLength += 1;
                                    else realLength += 2;
                                }
                                return realLength;
                            }
                        };
                        //获取字符串长度 end
                        var errorText=$(element).parent().find('span.validation-errorText');

                        $.each(errorText,function(index,error){
                            if(jmz.GetLength(scope.ngModel) == 0){                          //必填项验证
                                errorText[index].innerHTML= element[0].attributes['warn-text'].nodeValue + '为必填项';
                                error.style.display='flex';
                                error.style.position='relative';
                                error.style.left='-30px';
                                error.style.top='-10px';
                            } else{
                                error.style.display="none";
                            }
                        });
                    };

                    $timeout(function(){

                        ////错误校验
                        //errorCheck();

                        jeDate(options);
                    },1);
                }
            }
        }]);
});


'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('antd/dist/antd.min.css');
var React = require('react');
var React__default = _interopDefault(React);
var cloneDeep = _interopDefault(require('lodash.clonedeep'));
var antd = require('antd');
var icons = require('@ant-design/icons');

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

var _typeMap;

var DataType;

(function (DataType) {
  DataType["STRING"] = "string";
  DataType["NUMBER"] = "number";
  DataType["BOOLEAN"] = "boolean";
  DataType["OBJECT"] = "object";
  DataType["ARRAY"] = "array";
})(DataType || (DataType = {}));

var typeMap = (_typeMap = {}, _typeMap[DataType.STRING] = '', _typeMap[DataType.BOOLEAN] = true, _typeMap[DataType.NUMBER] = 0, _typeMap[DataType.OBJECT] = {}, _typeMap[DataType.ARRAY] = [], _typeMap);
var getTypeString = function getTypeString(element) {
  var _Object$prototype$toS;

  return (_Object$prototype$toS = Object.prototype.toString.call(element).match(/\w+/g)) == null ? void 0 : _Object$prototype$toS[1].toLowerCase();
};
var getQuoteAddress = function getQuoteAddress(oldElement, newElement, currentData) {
  if (oldElement === currentData) {
    return newElement;
  }

  for (var key in currentData) {
    if (Object.prototype.hasOwnProperty.call(currentData, key)) {
      var element = currentData[key];

      if (oldElement === element) {
        currentData[key] = newElement;
      } else if (typeof element === 'object' && element) {
        getQuoteAddress(oldElement, newElement, element);
      }
    }
  }

  return currentData;
};
var isObject = function isObject(value) {
  return value && typeof value === 'object';
};
var getPlaceholder = function getPlaceholder(value) {
  if (!isObject(value)) return null;
  var currentType = getTypeString(value);

  if (currentType === DataType.ARRAY) {
    return "Array [" + value.length + "]";
  } else {
    return "Object {" + Object.keys(value).length + "}";
  }
};

var ConfigContext = /*#__PURE__*/React__default.createContext(null);

var AddItem = function AddItem(props) {
  var _useContext = React.useContext(ConfigContext),
      setEditObject = _useContext.setEditObject,
      editObject = _useContext.editObject,
      optionsMap = _useContext.optionsMap;

  var uniqueKey = props.uniqueKey,
      sourceData = props.sourceData;
  var isArray = Array.isArray(sourceData);

  var _useState = React.useState({}),
      templateData = _useState[0],
      setTemplateData = _useState[1];

  var _useState2 = React.useState({}),
      showIncreaseMap = _useState2[0],
      setShowIncreaseMap = _useState2[1];

  var onClickIncrease = function onClickIncrease(key, value) {
    showIncreaseMap[key] = value;
    templateData[key] = {};
    setTemplateData(_extends({}, templateData));
    setShowIncreaseMap(_extends({}, showIncreaseMap));
  };

  var changeInputKey = function changeInputKey(uniqueKey, event) {
    templateData[uniqueKey]['key'] = event.target.value;
    setTemplateData(_extends({}, templateData));
  };

  var changeInputValue = function changeInputValue(uniqueKey, value) {
    templateData[uniqueKey]['value'] = value;
    setTemplateData(_extends({}, templateData));
  };

  var onChangeTempType = function onChangeTempType(uniqueKey, type) {
    templateData[uniqueKey]['type'] = type;
    templateData[uniqueKey]['value'] = typeMap[type];
    setTemplateData(_extends({}, templateData));
  };

  var onConfirmIncrease = function onConfirmIncrease(uniqueKey, sourceData) {
    var _cloneDeep = cloneDeep(templateData[uniqueKey]),
        aKey = _cloneDeep.key,
        value = _cloneDeep.value;

    if (isArray) {
      sourceData.push(value);
    } else {
      sourceData[aKey] = value;
    }

    setEditObject(_extends({}, editObject));
    onClickIncrease(uniqueKey, false);
  };

  var getTypeTemplate = function getTypeTemplate(type) {
    var _optionsMap$templateD, _templateData$uniqueK;

    switch (type) {
      case DataType.STRING:
        var currentOptions = (_optionsMap$templateD = optionsMap == null ? void 0 : optionsMap[(_templateData$uniqueK = templateData[uniqueKey]) == null ? void 0 : _templateData$uniqueK['key']]) != null ? _optionsMap$templateD : [];
        return React__default.createElement(antd.AutoComplete, {
          style: {
            width: 100
          },
          size: "small",
          options: currentOptions,
          onChange: function onChange(value) {
            return changeInputValue(uniqueKey, value);
          },
          filterOption: function filterOption(inputValue, option) {
            return ("" + option.value).toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
          }
        });

      case DataType.NUMBER:
        return React__default.createElement(antd.InputNumber, {
          size: "small",
          style: {
            width: '100px'
          },
          onBlur: function onBlur(event) {
            return changeInputValue(uniqueKey, +event.target.value);
          }
        });

      case DataType.BOOLEAN:
        return React__default.createElement(antd.Select, {
          size: "small",
          style: {
            width: '100px'
          },
          defaultValue: true,
          onChange: function onChange(value) {
            changeInputValue(uniqueKey, value);
          }
        }, React__default.createElement(antd.Select.Option, {
          value: true,
          label: "true"
        }, "true"), React__default.createElement(antd.Select.Option, {
          value: false,
          label: "false"
        }, "false"));

      default:
        return null;
    }
  };

  return React__default.createElement("div", {
    className: "addItem",
    key: uniqueKey
  }, showIncreaseMap[uniqueKey] ? React__default.createElement(antd.Space, null, !isArray && React__default.createElement("div", null, React__default.createElement(antd.Input, {
    size: "small",
    style: {
      width: '100px'
    },
    onChange: function onChange(event) {
      return changeInputKey(uniqueKey, event);
    }
  })), React__default.createElement("div", null, React__default.createElement(antd.Select, {
    size: "small",
    style: {
      width: '100px'
    },
    onChange: function onChange(value) {
      return onChangeTempType(uniqueKey, value);
    },
    defaultValue: DataType.STRING
  }, Object.values(DataType).map(function (item) {
    return React__default.createElement(antd.Select.Option, {
      value: item,
      key: item,
      style: {
        width: '100px'
      }
    }, item);
  }))), getTypeTemplate(templateData[uniqueKey]['type'] || DataType.STRING), React__default.createElement("div", null, React__default.createElement(antd.Space, null, React__default.createElement(antd.Button, {
    size: "small",
    type: "primary",
    onClick: function onClick() {
      return onConfirmIncrease(uniqueKey, sourceData);
    }
  }, "Confirm"), React__default.createElement(antd.Button, {
    size: "small",
    onClick: function onClick() {
      return onClickIncrease(uniqueKey, false);
    }
  }, "Cancel")))) : React__default.createElement(antd.Col, {
    span: 8
  }, React__default.createElement(icons.PlusSquareOutlined, {
    style: {
      color: '#1E88E5'
    },
    onClick: function onClick() {
      return onClickIncrease(uniqueKey, true);
    }
  })));
};

function CollapsePart(props) {
  var fieldValue = props.fieldValue,
      uniqueKey = props.uniqueKey;

  var _useContext = React.useContext(ConfigContext),
      onChangeAllow = _useContext.onChangeAllow,
      allowMap = _useContext.allowMap;

  if (!isObject(fieldValue)) return React__default.createElement("span", null);
  return React__default.createElement("span", {
    style: {
      marginRight: '5px'
    },
    onClick: function onClick() {
      return onChangeAllow(uniqueKey);
    }
  }, React__default.createElement(icons.CaretDownOutlined, {
    className: "collapse " + (!allowMap[uniqueKey] ? 'up' : 'down')
  }));
}

function ToolsView(props) {
  return React__default.createElement(ConfigContext.Consumer, null, function (_ref) {
    var onChangeType = _ref.onChangeType,
        onClickDelete = _ref.onClickDelete;
    return React__default.createElement("span", {
      className: "tools"
    }, React__default.createElement("span", null, React__default.createElement(antd.Select, {
      size: "small",
      style: {
        width: '100px'
      },
      onChange: function onChange(value) {
        return onChangeType(value, props.fieldValue);
      },
      defaultValue: getTypeString(props.fieldValue)
    }, Object.values(DataType).map(function (item) {
      return React__default.createElement(antd.Select.Option, {
        value: item,
        key: item
      }, item);
    }))), React__default.createElement("span", {
      className: "iconSubtraction"
    }, React__default.createElement(icons.MinusSquareOutlined, {
      style: {
        color: '#E74C3C'
      },
      onClick: function onClick() {
        return onClickDelete(props.fieldKey, props.sourceData);
      }
    })));
  });
}

function ArrayView(props) {
  var _useContext = React.useContext(ConfigContext),
      allowMap = _useContext.allowMap;

  return React__default.createElement("div", {
    className: "arrayContent"
  }, React__default.createElement("div", {
    style: {
      marginTop: '10px'
    }
  }, props.fieldValue.map(function (item, index) {
    var uniqueKey = props.parentUniqueKey + "-" + index;
    return React__default.createElement("div", {
      className: "indexLine",
      key: uniqueKey
    }, React__default.createElement("span", {
      className: "jsonKey"
    }, React__default.createElement("span", {
      style: {
        marginRight: '5px'
      }
    }, index + 1, ".")), React__default.createElement(CollapsePart, {
      uniqueKey: uniqueKey,
      fieldValue: item
    }), isObject(item) ? React__default.createElement("b", {
      className: "mt15"
    }, getPlaceholder(item)) : null, !allowMap[uniqueKey] && React__default.createElement("span", {
      className: "jsonValue"
    }, props.getValue(item, index, props.fieldValue, props.deepLevel + 1, uniqueKey)), React__default.createElement(ToolsView, {
      fieldValue: item,
      fieldKey: "" + index,
      sourceData: props.fieldValue
    }));
  })), React__default.createElement("div", null, React__default.createElement(AddItem, {
    key: props.parentUniqueKey,
    uniqueKey: props.parentUniqueKey,
    deepLevel: props.deepLevel,
    sourceData: props.fieldValue
  })));
}

function JsonView(props) {
  var editObject = props.editObject,
      setEditObject = props.setEditObject,
      optionsMap = props.optionsMap;

  var _useState = React.useState({}),
      allowMap = _useState[0],
      setAllowMap = _useState[1];

  var syncData = function syncData(data) {
    setEditObject(_extends({}, data));
  };

  var onClickDelete = function onClickDelete(key, sourceData) {
    if (Array.isArray(sourceData)) {
      sourceData.splice(+key, 1);
    } else {
      Reflect.deleteProperty(sourceData, key);
    }

    syncData(editObject);
  };

  var onChangeType = function onChangeType(type, fieldValue) {
    var newEditObject = getQuoteAddress(fieldValue, typeMap[type], editObject);
    syncData(newEditObject);
  };

  var onChangeKey = function onChangeKey(event, currentKey, source) {
    var newValue = {};

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (key === currentKey) {
          newValue[event.target.value] = source[key];
        } else {
          newValue[key] = source[key];
        }
      }
    }

    var newTotalData = getQuoteAddress(source, newValue, editObject);
    syncData(newTotalData);
  };

  var onChangeValue = function onChangeValue(value, key, source) {
    source[key] = value;
    syncData(editObject);
  };

  var getValue = function getValue(fieldValue, fieldKey, sourceData, deepLevel, parentUniqueKey) {
    var _optionsMap$fieldKey;

    var thatType = getTypeString(fieldValue);

    switch (thatType) {
      case DataType.ARRAY:
        return React__default.createElement(ArrayView, {
          fieldValue: fieldValue,
          fieldKey: fieldKey,
          sourceData: sourceData,
          deepLevel: deepLevel,
          parentUniqueKey: parentUniqueKey,
          getValue: getValue
        });

      case DataType.OBJECT:
        return React__default.createElement("span", null, renderJsonConfig(fieldValue, deepLevel + 1, parentUniqueKey));

      case DataType.STRING:
        var currentOptions = (_optionsMap$fieldKey = optionsMap == null ? void 0 : optionsMap[fieldKey]) != null ? _optionsMap$fieldKey : [];
        return React__default.createElement(antd.AutoComplete, {
          style: {
            width: 100
          },
          size: "small",
          options: currentOptions,
          value: fieldValue,
          onChange: function onChange(value) {
            return onChangeValue(value, fieldKey, sourceData);
          },
          filterOption: function filterOption(inputValue, option) {
            return ("" + option.value).toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
          }
        });

      case DataType.NUMBER:
        return React__default.createElement(antd.InputNumber, {
          size: "small",
          style: {
            width: '100px'
          },
          placeholder: fieldValue,
          value: fieldValue,
          onBlur: function onBlur(event) {
            onChangeValue(+event.target.value, fieldKey, sourceData);
          }
        });

      case DataType.BOOLEAN:
        return React__default.createElement(antd.Select, {
          size: "small",
          style: {
            width: '100px'
          },
          defaultValue: true,
          onChange: function onChange(value) {
            onChangeValue(value, fieldKey, sourceData);
          }
        }, React__default.createElement(antd.Select.Option, {
          value: true,
          label: "true"
        }, "true"), React__default.createElement(antd.Select.Option, {
          value: false,
          label: "false"
        }, "false"));
    }
  };

  var onChangeAllow = function onChangeAllow(uniqueKey) {
    allowMap[uniqueKey] = !allowMap[uniqueKey];
    setAllowMap(_extends({}, allowMap));
  };

  var defaultLevel = 1;

  var renderJsonConfig = function renderJsonConfig(sourceData, deepLevel, parentUniqueKey) {
    if (deepLevel === void 0) {
      deepLevel = defaultLevel;
    }

    if (parentUniqueKey === void 0) {
      parentUniqueKey = "" + deepLevel;
    }

    var keyList = Object.keys(sourceData);

    if (!keyList.length) {
      return React__default.createElement("div", {
        style: {
          marginLeft: '20px'
        }
      }, React__default.createElement(AddItem, {
        uniqueKey: 'defaultKay',
        deepLevel: deepLevel,
        sourceData: sourceData
      }));
    }

    return React__default.createElement("div", {
      className: "objectContent",
      style: {
        marginLeft: defaultLevel === deepLevel ? '0' : '20px'
      }
    }, React__default.createElement("div", {
      style: {
        marginTop: '10px'
      }
    }, keyList.map(function (fieldKey, index) {
      var uniqueKey = parentUniqueKey + "-" + index;
      var fieldValue = sourceData[fieldKey];
      return React__default.createElement("div", {
        key: uniqueKey,
        className: "indexLine"
      }, React__default.createElement(CollapsePart, {
        uniqueKey: uniqueKey,
        fieldValue: fieldValue
      }), React__default.createElement("span", {
        className: "jsonKey"
      }, React__default.createElement(antd.Input, {
        size: "small",
        style: {
          width: '100px'
        },
        placeholder: fieldKey,
        value: fieldKey,
        onChange: function onChange(event) {
          return onChangeKey(event, fieldKey, sourceData);
        }
      })), React__default.createElement("b", null, getPlaceholder(fieldValue)), !allowMap[uniqueKey] && React__default.createElement("span", {
        className: "jsonValue"
      }, getValue(fieldValue, fieldKey, sourceData, deepLevel, uniqueKey)), React__default.createElement("span", {
        className: "toolsView"
      }, React__default.createElement(ToolsView, {
        fieldValue: fieldValue,
        fieldKey: fieldKey,
        sourceData: sourceData
      })));
    })), React__default.createElement("div", null, React__default.createElement(AddItem, {
      key: parentUniqueKey,
      uniqueKey: parentUniqueKey,
      deepLevel: deepLevel,
      sourceData: sourceData
    })));
  };

  return React__default.createElement(ConfigContext.Provider, {
    value: {
      editObject: editObject,
      setEditObject: setEditObject,
      optionsMap: optionsMap,
      onChangeType: onChangeType,
      onClickDelete: onClickDelete,
      onChangeAllow: onChangeAllow,
      allowMap: allowMap
    }
  }, renderJsonConfig(editObject));
}

function JsonEditor(props) {
  var _props$width;

  var _useState = React.useState(cloneDeep(props.data)),
      editObject = _useState[0],
      setEditObject = _useState[1];

  React.useEffect(function () {
    props.onChange(editObject);
  }, [editObject]);
  return React__default.createElement("div", {
    className: "jsonEditorContainer",
    style: {
      width: (_props$width = props.width) != null ? _props$width : 500
    }
  }, React__default.createElement(JsonView, Object.assign({}, {
    editObject: editObject,
    setEditObject: setEditObject,
    optionsMap: props.optionsMap
  })));
}

exports.default = JsonEditor;
//# sourceMappingURL=react-json-editor-ui.cjs.development.js.map

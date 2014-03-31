/**
 * Readaptation of theozaurus's equivalent-xml-js for dojo and possibly chai assertion library
 *
 *
 */
define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "./zip",
    "dojo/has",
    "dojo/has!host-node?dojo/node!xmldom", ],
    function (declare, array, zip, has, xmldom) {
        EquivXML = declare(null, {
            _xml: null,
            _opts: {
                normWhite: true,
            },
            _compareName: function (nodeA, nodeB) {
                var ret = nodeA.nodeName === nodeB.nodeName;
                return ret;
            },
            _compareDocuments: function (nodeA, nodeB) {
                if (!this._compareName(nodeA, nodeB)) {
                    return false;
                } else {
                    return this._compareChildren(nodeA, nodeB);
                }
            },
            _compareElement: function (nodeA, nodeB) {
                if (!this._compareName(nodeA, nodeB)) {
                    return false;
                } else {
                    return this._compareChildren(nodeA, nodeB);
                }
            },
            _compareAttr: function (nodeA, nodeB) {
                if (!this._compareName(nodeA, nodeB)) {
                    return false;
                } else {
                    return nodeA.value == nodeB.value;
                }
            },
            _compareText: function (nodeA, nodeB) {
                if (this._opts.normWhite) {
                    return nodeA.textContent.trim().replace(/\s+/g, ' ') == nodeB.textContent.trim().replace(/\s+/g, ' ');
                } else {
                    return nodeA.textContent == nodeB.textContent;
                }
            },
            _compareCDATA: function (nodeA, nodeB) {
                var ret = nodeA.nodeValue == nodeB.nodeValue;
                return ret;
            },
            _compareNodes: function (nodeA, nodeB) {
                if (!this._compareName(nodeA, nodeB)) {
                    return false;
                } else {
                    var res;
                    switch (nodeA.nodeType) {
                        case 9:
                            res = this._compareDocuments(nodeA, nodeB);
                            break;
                        case 1:
                            res = this._compareElement(nodeA, nodeB);
                            break;
                        case 2:
                            res = this._compareAttrs(nodeA, nodeB);
                            break;
                        case 3:
                            res = this._compareText(nodeA, nodeB);
                            break;
                        case 4:
                            res = this._compareCDATA(nodeA, nodeB);
                            break;
                        default:
                            res = this._compareChildren(nodeA, nodeB);
                    }
                    return res;
                }
            },
            _compareAttrs: function (nodeA, nodeB) {
                return this._compareName(nodeA, nodeB) && (nodeA.value == nodeB.value);
            },
            _compareChildren: function (nodeA, nodeB) {
                var nodelistA = this._nodeList(nodeA);
                var nodelistB = this._nodeList(nodeB);
                var res = this._compareNodeList(nodelistA, nodelistB);
                return res;
            },
            _compareNodeList: function (nodelistA, nodelistB) {
                if (nodelistA.length != nodelistB.length) {
                    return false;
                }
                //zip them together so it can be mapped
                var zipped = zip([nodelistA,nodelistB]);
                //same order of nodes required for this compare
                var ret = array.every(zipped, function(pair){
                    return this._compareNodes(pair[0], pair[1]);
                },  this);
                return ret;
            },
            _nodeList: function (node) {
                var list = node.childNodes;
                /*
                 * Filter out the comments and empty text children (they do nothing!)
                 */
                var ret = array.filter(list, function (child) {
                    if ((child.nodeType == 8)) {
                        return false;
                    } else if ((this._opts.normWhite && (child.nodeType == 3)) && ("" == child.textContent.trim())) {
                        return false;
                    }
                    return true;
                }, this);
                return ret;
            },
            constructor: function (opts) {
                if (opts != null) {
                    this._opts = opts;//TODO use mixin for this
                }
                if (has("host-node")) {
                    this._xml = xmldom;
                } else {
                    this._xml = window;
                }
                /**
                 * Do nothing constructor!?!?
                 */
            },
            areEqual: function (nodeA, nodeB) {
                ret = this._compareNodes(nodeA, nodeB);
                return ret;
            }
        });
        /*
         EquivalentXml = (function () {
         var canonical_name = function (node) {
         return node.namespaceURI + ':' + node.localName;
         };

         var compare_documents = function (node_1, node_2, opts) {
         return is_equivalent(node_1.childNodes, node_2.childNodes, opts);
         };

         var compare_elements = function (node_1, node_2, opts) {
         return canonical_name(node_1) == canonical_name(node_2) && compare_children(node_1, node_2, opts);
         };

         var compare_attributes = function (node_1, node_2, opts) {
         return canonical_name(node_1) == canonical_name(node_2) && node_1.value == node_2.value;
         };

         var compare_cdata = function (node_1, node_2, opts) {
         return node_1.nodeValue == node_2.nodeValue;
         };

         var compare_text = function (node_1, node_2, opts) {
         if (opts.normalize_whitespace) {
         return strip(node_1.textContent).replace(/\s+/g, ' ') == strip(node_2.textContent).replace(/\s+/g, ' ');
         } else {
         return node_1.nodeValue == node_2.nodeValue;
         }
         };

         var attribute_is_namespace = function (attribute) {
         return (attribute.prefix == "xmlns" || attribute.name == "xmlns") && attribute.namespaceURI == "http://www.w3.org/2000/xmlns/";
         };

         var compare_children = function (node_1, node_2, opts) {
         var nodelist_1 = as_nodelist(node_1.childNodes, opts);
         var nodelist_2 = as_nodelist(node_2.childNodes, opts);
         var result = compare_nodelists(nodelist_1, nodelist_2, opts);

         if (node_1.attributes instanceof NamedNodeMap) {
         var attributes_1 = _.reject(node_1.attributes, attribute_is_namespace);
         var attributes_2 = _.reject(node_2.attributes, attribute_is_namespace);
         result = result && compare_nodelists(attributes_1, attributes_2, opts);
         }

         return result;
         };

         var node_index = function (node, set) {
         var index = -1;
         _.find(set, function (element, i) {
         var result = node === element;
         if (result) {
         index = i;
         }
         return result;
         });
         return index;
         };

         var as_nodelist = function (data, opts) {
         return _.reject(data, function (child) {
         return child instanceof Comment ||
         (opts.normalize_whitespace && child instanceof Text && _.isEmpty(strip(child.textContent)));
         });
         };

         // Based on jQuery implementation
         var xml = function (data) {
         if (typeof data != "string") {
         return undefined;
         }

         var xml, tmp;
         try {
         if (window.DOMParser) { // Standard
         tmp = new DOMParser();
         xml = tmp.parseFromString(data, "text/xml");
         } else { // IE
         xml = new ActiveXObject("Microsoft.XMLDOM");
         xml.async = "false";
         xml.loadXML(data);
         }
         } catch (e) {
         xml = undefined;
         }

         // Nasty hack to detect errors generated by DOMParser
         if (xml.documentElement.childNodes[0] && xml.documentElement.childNodes[0].nodeName == "parsererror" ||
         xml.querySelector("html > body > parsererror")) {
         xml = undefined;
         }

         return xml;
         };

         var compare_nodelists = function (nodelist_1, nodelist_2, opts) {
         if (nodelist_1.length != nodelist_2.length) {
         return false;
         }

         var nodelist_2_found = [];

         var all_found = _.all(nodelist_1, function (node_1, node_1_index) {
         var found_node = _.find(nodelist_2, function (node_2) {
         var node_2_index = node_index(node_2, nodelist_2);
         var result = false;

         // Only look at nodes we haven't already ticked off
         if (!_.include(nodelist_2_found, node_2_index)) {
         result = is_equivalent(node_1, node_2, opts);
         if (result) {
         nodelist_2_found.push(node_2_index);
         }
         }

         return result;
         });

         return !!found_node && (!opts.element_order || opts.element_order && node_1_index == node_index(found_node, nodelist_2));
         });

         // Make sure all nodelist_1 elements are found, and there are no extra in nodelist_2
         return all_found && nodelist_2_found.length == nodelist_2.length;
         };

         var compare_nodes = function (node_1, node_2, opts) {
         var result;
         if (_.any([node_1, node_2], isNotNode)) {
         result = toString(node_1) == toString(node_2);
         } else {
         switch (node_1.constructor) {
         case Document:
         result = compare_documents(node_1, node_2, opts);
         break;
         case Element:
         result = compare_elements(node_1, node_2, opts);
         break;
         case Attr:
         result = compare_attributes(node_1, node_2, opts);
         break;
         case Text:
         result = compare_text(node_1, node_2, opts);
         break;
         case CDATASection:
         result = compare_cdata(node_1, node_2, opts);
         break;
         default:
         result = compare_children(node_1, node_2, opts);
         }
         }
         return result;
         };

         var isNode = function (node) {
         return typeof node == "object" && node !== null && typeof node.nodeType == "number";
         };

         var isNotNode = function (node) {
         return !isNode(node);
         };

         var isNodelist = function (node) {
         return node instanceof NodeList || node instanceof NamedNodeMap;
         };

         var strip = function (string) {
         return string.replace(/(^\s+)|(\s+$)/g, '');
         };

         var toString = function (object) {
         if (object === null) {
         return "";
         } else if (object instanceof Document) {
         return new XMLSerializer().serializeToString(object);
         }
         else {
         return object.toString();
         }
         };

         var is_equivalent = function (node_1, node_2, opts) {
         if (_.any([node_1, node_2], isNodelist)) {
         return compare_nodelists(node_1, node_2, opts);
         } else {
         return compare_nodes(node_1, node_2, opts);
         }
         };

         return {
         isEquivalent: function (node_1, node_2, options) {
         var opts = _.clone(this.defaults);
         _.extend(opts, options);

         return is_equivalent(node_1, node_2, opts);
         },
         xml: xml,
         defaults: {
         element_order: false,
         normalize_whitespace: true
         },
         jasmine: {
         beEquivalentTo: function (expected, options) {
         var actual = this.actual;

         this.message = function () {
         return "Expected " + toString(actual) + " to be equivalent to " + toString(expected);
         };

         return EquivalentXml.isEquivalent(actual, expected, options);
         }
         },
         };
         })();
         */
        return EquivXML;
    });
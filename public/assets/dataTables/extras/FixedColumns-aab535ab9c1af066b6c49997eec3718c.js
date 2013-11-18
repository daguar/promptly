/**
 * @summary     FixedColumns
 * @description Freeze columns in place on a scrolling DataTable
 * @file        FixedColumns.js
 * @version     2.0.4.dev
 * @author      Allan Jardine (www.sprymedia.co.uk)
 * @license     GPL v2 or BSD 3 point style
 * @contact     www.sprymedia.co.uk/contact
 *
 * @copyright Copyright 2010-2011 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 */
/* Global scope for FixedColumns */
var FixedColumns;(function(a,b,c){FixedColumns=function(b,c){if(!this instanceof FixedColumns){alert("FixedColumns warning: FixedColumns must be initialised with the 'new' keyword.");return}typeof c=="undefined"&&(c={}),this.s={dt:b.fnSettings(),iTableColumns:b.fnSettings().aoColumns.length,aiOuterWidths:[],aiInnerWidths:[],bOldIE:a.browser.msie&&(a.browser.version=="6.0"||a.browser.version=="7.0")},this.dom={scroller:null,header:null,body:null,footer:null,grid:{wrapper:null,dt:null,left:{wrapper:null,head:null,body:null,foot:null},right:{wrapper:null,head:null,body:null,foot:null}},clone:{left:{header:null,body:null,footer:null},right:{header:null,body:null,footer:null}}},this.s.dt.oFixedColumns=this,this._fnConstruct(c)},FixedColumns.prototype={fnUpdate:function(){this._fnDraw(!0)},fnRedrawLayout:function(){this._fnGridLayout()},fnRecalculateHeight:function(a){a._DTTC_iHeight=null,a.style.height="auto"},fnSetRowHeight:function(b,c){var d=a(b).children(":first"),e=d.outerHeight()-d.height();a.browser.mozilla||a.browser.opera?b.style.height=c+"px":a(b).children().height(c-e)},_fnConstruct:function(c){var d,e,f,g=this;if(typeof this.s.dt.oInstance.fnVersionCheck!="function"||this.s.dt.oInstance.fnVersionCheck("1.8.0")!==!0){alert("FixedColumns "+FixedColumns.VERSION+" required DataTables 1.8.0 or later. "+"Please upgrade your DataTables installation");return}if(this.s.dt.oScroll.sX===""){this.s.dt.oInstance.oApi._fnLog(this.s.dt,1,"FixedColumns is not needed (no x-scrolling in DataTables enabled), so no action will be taken. Use 'FixedHeader' for column fixing when scrolling is not enabled");return}this.s=a.extend(!0,this.s,FixedColumns.defaults,c),this.dom.grid.dt=a(this.s.dt.nTable).parents("div.dataTables_scroll")[0],this.dom.scroller=a("div.dataTables_scrollBody",this.dom.grid.dt)[0];var h=a(this.dom.grid.dt).width(),i=0,j=0;a("tbody>tr:eq(0)>td, tbody>tr:eq(0)>th",this.s.dt.nTable).each(function(b){g.s.aiInnerWidths.push(a(this).width()),f=a(this).outerWidth(),g.s.aiOuterWidths.push(f),b<g.s.iLeftColumns&&(i+=f),g.s.iTableColumns-g.s.iRightColumns<=b&&(j+=f)}),this.s.iLeftWidth===null&&(this.s.iLeftWidth=this.s.sLeftWidth=="fixed"?i:i/h*100),this.s.iRightWidth===null&&(this.s.iRightWidth=this.s.sRightWidth=="fixed"?j:j/h*100),this._fnGridSetup();for(d=0;d<this.s.iLeftColumns;d++)this.s.dt.oInstance.fnSetColumnVis(d,!1);for(d=this.s.iTableColumns-this.s.iRightColumns;d<this.s.iTableColumns;d++)this.s.dt.oInstance.fnSetColumnVis(d,!1);a(this.dom.scroller).scroll(function(){g.dom.grid.left.body.scrollTop=g.dom.scroller.scrollTop,g.s.iRightColumns>0&&(g.dom.grid.right.body.scrollTop=g.dom.scroller.scrollTop)}),a(b).resize(function(){g._fnGridLayout.call(g)});var k=!0;this.s.dt.aoDrawCallback=[{fn:function(){g._fnDraw.call(g,k),g._fnGridHeight(g),k=!1},sName:"FixedColumns"}].concat(this.s.dt.aoDrawCallback),this._fnGridLayout(),this._fnGridHeight(),this.s.dt.oInstance.fnDraw(!1)},_fnGridSetup:function(){var b=this;this.dom.body=this.s.dt.nTable,this.dom.header=this.s.dt.nTHead.parentNode,this.dom.header.parentNode.parentNode.style.position="relative";var c=a('<div class="DTFC_ScrollWrapper" style="position:relative; clear:both;"><div class="DTFC_LeftWrapper" style="position:absolute; top:0; left:0;"><div class="DTFC_LeftHeadWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div><div class="DTFC_LeftBodyWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div><div class="DTFC_LeftFootWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div></div><div class="DTFC_RightWrapper" style="position:absolute; top:0; left:0;"><div class="DTFC_RightHeadWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div><div class="DTFC_RightBodyWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div><div class="DTFC_RightFootWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div></div></div>')[0];nLeft=c.childNodes[0],nRight=c.childNodes[1],this.dom.grid.wrapper=c,this.dom.grid.left.wrapper=nLeft,this.dom.grid.left.head=nLeft.childNodes[0],this.dom.grid.left.body=nLeft.childNodes[1],this.s.iRightColumns>0&&(this.dom.grid.right.wrapper=nRight,this.dom.grid.right.head=nRight.childNodes[0],this.dom.grid.right.body=nRight.childNodes[1]),this.s.dt.nTFoot&&(this.dom.footer=this.s.dt.nTFoot.parentNode,this.dom.grid.left.foot=nLeft.childNodes[2],this.s.iRightColumns>0&&(this.dom.grid.right.foot=nRight.childNodes[2])),c.appendChild(nLeft),this.dom.grid.dt.parentNode.insertBefore(c,this.dom.grid.dt),c.appendChild(this.dom.grid.dt),this.dom.grid.dt.style.position="absolute",this.dom.grid.dt.style.top="0px",this.dom.grid.dt.style.left=this.s.iLeftWidth+"px",this.dom.grid.dt.style.width=a(this.dom.grid.dt).width()-this.s.iLeftWidth-this.s.iRightWidth+"px"},_fnGridLayout:function(){var b=this.dom.grid,c=a(b.wrapper).width(),d=0,e=0,f=0;this.s.sLeftWidth=="fixed"?d=this.s.iLeftWidth:d=this.s.iLeftWidth/100*c,this.s.sRightWidth=="fixed"?e=this.s.iRightWidth:e=this.s.iRightWidth/100*c,f=c-d-e,b.left.wrapper.style.width=d+"px",b.dt.style.width=f+"px",b.dt.style.left=d+"px",this.s.iRightColumns>0&&(b.right.wrapper.style.width=e+"px",b.right.wrapper.style.left=c-e+"px")},_fnGridHeight:function(){var b=this.dom.grid,c=a(this.dom.grid.dt).height();b.wrapper.style.height=c+"px",b.left.body.style.height=a(this.dom.scroller).height()+"px",b.left.wrapper.style.height=c+"px",this.s.iRightColumns>0&&(b.right.wrapper.style.height=c+"px",b.right.body.style.height=a(this.dom.scroller).height()+"px")},_fnDraw:function(b){this._fnCloneLeft(b),this._fnCloneRight(b),this.s.fnDrawCallback!==null&&this.s.fnDrawCallback.call(this,this.dom.clone.left,this.dom.clone.right),a(this).trigger("draw",{leftClone:this.dom.clone.left,rightClone:this.dom.clone.right})},_fnCloneRight:function(a){if(this.s.iRightColumns<=0)return;var b=this,c,d,e=[];for(c=this.s.iTableColumns-this.s.iRightColumns;c<this.s.iTableColumns;c++)e.push(c);this._fnClone(this.dom.clone.right,this.dom.grid.right,e,a)},_fnCloneLeft:function(a){if(this.s.iLeftColumns<=0)return;var b=this,c,d,e=[];for(c=0;c<this.s.iLeftColumns;c++)e.push(c);this._fnClone(this.dom.clone.left,this.dom.grid.left,e,a)},_fnCopyLayout:function(b,c){var d=[],e=[],f=[];for(var g=0,h=b.length;g<h;g++){var i=[];i.nTr=a(b[g].nTr).clone(!0)[0];for(var j=0,k=this.s.iTableColumns;j<k;j++){if(a.inArray(j,c)===-1)continue;var l=a.inArray(b[g][j].cell,f);if(l===-1){var m=a(b[g][j].cell).clone(!0)[0];e.push(m),f.push(b[g][j].cell),i.push({cell:m,unique:b[g][j].unique})}else i.push({cell:e[l],unique:b[g][j].unique})}d.push(i)}return d},_fnClone:function(b,c,d,e){var f=this,g,h,i,j,k,l,m,n,o;if(e){b.header!==null&&b.header.parentNode.removeChild(b.header),b.header=a(this.dom.header).clone(!0)[0],b.header.className+=" DTFC_Cloned",b.header.style.width="100%",c.head.appendChild(b.header);var p=this._fnCopyLayout(this.s.dt.aoHeader,d),q=a(">thead",b.header);q.empty();for(g=0,h=p.length;g<h;g++)q[0].appendChild(p[g].nTr);this.s.dt.oApi._fnDrawHead(this.s.dt,p,!0)}else{var p=this._fnCopyLayout(this.s.dt.aoHeader,d),r=[];this.s.dt.oApi._fnDetectHeader(r,a(">thead",b.header)[0]);for(g=0,h=p.length;g<h;g++)for(i=0,j=p[g].length;i<j;i++)r[g][i].cell.className=p[g][i].cell.className,a("span.DataTables_sort_icon",r[g][i].cell).each(function(){this.className=a("span.DataTables_sort_icon",p[g][i].cell)[0].className})}this._fnEqualiseHeights("thead",this.dom.header,b.header),this.s.sHeightMatch=="auto"&&a(">tbody>tr",f.dom.body).css("height","auto"),b.body!==null&&(b.body.parentNode.removeChild(b.body),b.body=null),b.body=a(this.dom.body).clone(!0)[0],b.body.className+=" DTFC_Cloned",b.body.style.paddingBottom=this.s.dt.oScroll.iBarWidth+"px",b.body.style.marginBottom=this.s.dt.oScroll.iBarWidth*2+"px",b.body.getAttribute("id")!==null&&b.body.removeAttribute("id"),a(">thead>tr",b.body).empty(),a(">tfoot",b.body).remove();var s=a("tbody",b.body)[0];a(s).empty();if(this.s.dt.aiDisplay.length>0){var t=a(">thead>tr",b.body)[0];for(o=0;o<d.length;o++)m=d[o],n=a(this.s.dt.aoColumns[m].nTh).clone(!0)[0],n.innerHTML="",oStyle=n.style,oStyle.paddingTop="0",oStyle.paddingBottom="0",oStyle.borderTopWidth="0",oStyle.borderBottomWidth="0",oStyle.height=0,oStyle.width=f.s.aiInnerWidths[m]+"px",t.appendChild(n);a(">tbody>tr",f.dom.body).each(function(b){var c=this.cloneNode(!1),e=f.s.dt.oFeatures.bServerSide===!1?f.s.dt.aiDisplay[f.s.dt._iDisplayStart+b]:b;for(o=0;o<d.length;o++)m=d[o],typeof f.s.dt.aoData[e]._anHidden[m]!="undefined"&&(n=a(f.s.dt.aoData[e]._anHidden[m]).clone(!0)[0],c.appendChild(n));s.appendChild(c)})}else a(">tbody>tr",f.dom.body).each(function(b){n=this.cloneNode(!0),n.className+=" DTFC_NoData",a("td",n).html(""),s.appendChild(n)});b.body.style.width="100%",c.body.appendChild(b.body),this._fnEqualiseHeights("tbody",f.dom.body,b.body);if(this.s.dt.nTFoot!==null){if(e){b.footer!==null&&b.footer.parentNode.removeChild(b.footer),b.footer=a(this.dom.footer).clone(!0)[0],b.footer.className+=" DTFC_Cloned",b.footer.style.width="100%",c.foot.appendChild(b.footer);var p=this._fnCopyLayout(this.s.dt.aoFooter,d),u=a(">tfoot",b.footer);u.empty();for(g=0,h=p.length;g<h;g++)u[0].appendChild(p[g].nTr);this.s.dt.oApi._fnDrawHead(this.s.dt,p,!0)}else{var p=this._fnCopyLayout(this.s.dt.aoFooter,d),v=[];this.s.dt.oApi._fnDetectHeader(v,a(">tfoot",b.footer)[0]);for(g=0,h=p.length;g<h;g++)for(i=0,j=p[g].length;i<j;i++)v[g][i].cell.className=p[g][i].cell.className}this._fnEqualiseHeights("tfoot",this.dom.footer,b.footer)}var w=this.s.dt.oApi._fnGetUniqueThs(this.s.dt,a(">thead",b.header)[0]);a(w).each(function(a){m=d[a],this.style.width=f.s.aiInnerWidths[m]+"px"}),f.s.dt.nTFoot!==null&&(w=this.s.dt.oApi._fnGetUniqueThs(this.s.dt,a(">tfoot",b.footer)[0]),a(w).each(function(a){m=d[a],this.style.width=f.s.aiInnerWidths[m]+"px"}))},_fnGetTrNodes:function(a){var b=[];for(var c=0,d=a.childNodes.length;c<d;c++)a.childNodes[c].nodeName.toUpperCase()=="TR"&&b.push(a.childNodes[c]);return b},_fnEqualiseHeights:function(b,c,d){if(this.s.sHeightMatch=="none"&&b!=="thead"&&b!=="tfoot")return;var e=this,f,g,h,i,j,k,l=c.getElementsByTagName(b)[0],m=d.getElementsByTagName(b)[0],n=a(">"+b+">tr:eq(0)",c).children(":first"),o=n.outerHeight()-n.height(),p=this._fnGetTrNodes(l),q=this._fnGetTrNodes(m);for(f=0,g=q.length;f<g;f++){if(this.s.sHeightMatch=="semiauto"&&typeof p[f]._DTTC_iHeight!="undefined"&&p[f]._DTTC_iHeight!==null){a.browser.msie&&a(q[f]).children().height(p[f]._DTTC_iHeight-o);continue}j=p[f].offsetHeight,k=q[f].offsetHeight,h=k>j?k:j,this.s.sHeightMatch=="semiauto"&&(p[f]._DTTC_iHeight=h),a.browser.msie&&a.browser.version<8?(a(q[f]).children().height(h-o),a(p[f]).children().height(h-o)):(q[f].style.height=h+"px",p[f].style.height=h+"px")}}},FixedColumns.defaults={iLeftColumns:1,iRightColumns:0,fnDrawCallback:null,sLeftWidth:"fixed",iLeftWidth:null,sRightWidth:"fixed",iRightWidth:null,sHeightMatch:"semiauto"},FixedColumns.prototype.CLASS="FixedColumns",FixedColumns.VERSION="2.0.4.dev"})(jQuery,window,document);
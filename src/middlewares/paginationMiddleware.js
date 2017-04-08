'use strict';

module.exports = function*(next) {
    let query = this.request.query; 
 
    this.request.paginacao = query.paginacao || {};

    if( this.request.paginacao.length )
        this.request.paginacao = JSON.parse(this.request.paginacao);
     
    
    this.request.filtro = query.filtro || {};
    if( this.request.filtro.length ){
        this.request.filtro = JSON.parse(this.request.filtro);
    }
    this.request.filtro._id = this.request.user;

    delete query.skip;
    delete query.limit;
    delete query.filtro;

    this.request.query = query;
    yield next;
};

'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UnauthorizedException extends LogicalException {
  /**
   * Handle this exception by itself
   */
   handle (error, {response}) {
     return response.status(403).json({
       error: 'Unauthorized'
     });     
   };
}

module.exports = UnauthorizedException

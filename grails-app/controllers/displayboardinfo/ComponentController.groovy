package displayboardinfo



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ComponentController {

   
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Component.list(params), model:[componentInstanceCount: Component.count()]
    }

    def show(Component componentInstance) {
        respond componentInstance
    }

    def create() {
        respond new Component(params)
    }

    @Transactional
    def save(Component componentInstance) {
        if (componentInstance == null) {
            notFound()
            return
        }

        if (componentInstance.hasErrors()) {
            respond componentInstance.errors, view:'create'
            return
        }

        componentInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'componentInstance.label', default: 'Component'), componentInstance.id])
                redirect componentInstance
            }
            '*' { respond componentInstance, [status: CREATED] }
        }
    }

    def edit(Component componentInstance) {
        respond componentInstance
    }

    @Transactional
    def update(Component componentInstance) {
        if (componentInstance == null) {
            notFound()
            return
        }

        if (componentInstance.hasErrors()) {
            respond componentInstance.errors, view:'edit'
            return
        }

        componentInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'Component.label', default: 'Component'), componentInstance.id])
                redirect componentInstance
            }
            '*'{ respond componentInstance, [status: OK] }
        }
    }

    @Transactional
    def delete(Component componentInstance) {

        if (componentInstance == null) {
            notFound()
            return
        }

        componentInstance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'Component.label', default: 'Component'), componentInstance.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'componentInstance.label', default: 'Component'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}

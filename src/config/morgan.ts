import morgan from 'morgan'
import config from './config'
import logger from './logger'

// Defina um token personalizado 'message' que será usado no formato de resposta
// Esse token retornará a mensagem de erro, se ela existir nas variáveis locais de resposta
morgan.token('message', (req: any, res: any) => res.locals.errorMessage || '')

// Defina uma função auxiliar para obter o formato do IP para os logs de resposta
// Se a aplicação estiver em produção, incluirá o endereço IP remoto, caso contrário, estará vazio
const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '')

// Defina o formato de resposta para solicitações bem-sucedidas
// Inclui o método de solicitação, URL, código de status e tempo de resposta em milissegundos
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`

// Defina o formato de resposta para solicitações com erro
// Inclui o método de solicitação, URL, código de status, tempo de resposta e mensagem de erro
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`

// Crie um manipulador de sucesso para o Morgan, que registre as solicitações bem-sucedidas
// Ele irá pular solicitações com um código de status de 400 ou superior
// Os logs serão gravados no nível 'info' do logger personalizado
const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) }
})

// Crie um manipulador de erro para o Morgan, que registre as solicitações com erro
// Ele irá pular solicitações com um código de status abaixo de 400
// Os logs serão gravados no nível 'error' do logger personalizado
const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) }
})

// Exporte ambos os manipuladores como a exportação padrão
export  {
  successHandler,
  errorHandler,
}
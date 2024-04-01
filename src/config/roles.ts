const allRoles = { // Definindo um objeto 'allRoles' que contém funções e seus respectivos permissões
  user: [],    // Função de usuário atribuída a nenhum permissão
  admin: ['getUsers', 'manageUsers'], // Função de administrador atribuída a 'getUsers' e 'manageUsers'
};

const roles: any = Object.keys(allRoles); // Extraindo todas as chaves do objeto 'allRoles' e atribuindo ao variable 'roles'

const roleRights: any = new Map(Object.entries(allRoles)); // Criando um novo Map chamado 'roleRights' com pares chave-valor do objeto 'allRoles'

// Exportando as variáveis 'roles' e 'roleRights' como exportação padrão
export  {
  roles,
  roleRights,
};
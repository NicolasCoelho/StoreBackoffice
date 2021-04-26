Welcome to the Admin repository of the StorePartners project.

Passos para instalação 
1. Criar Fila com o nome Divulgadores para consumo das vendas com alvo definido (Compra realizado ou pagamento realizado).
2. Criar canal para para divulgadores ou cirar rota generica /divulgadores dentro do canal alvo
3. Utilizar a estrutura de single Page, sem header e footer na rota genérica ou na home do site em caso de novo canal.
4. Criar o arquivo divulgadores.template na raiz da pasta do tema do canal.
5. Atribuir divulgadores.template a rota generica ou a home do site em caso de novo canal.
6. Incluir script https://static.divulgadores.app.br/t.js com tag script no arquivo /Templates/master/includes/PageFooter.template
7. Criar usuário padrão para ser utilizado pelos robos de consumo do core. Certificar-se de uma senha forte. 
8. Preencher cadastro do ambiente e da loja no painel administrativo dos divulgadores com os respectivos dados.
9. Copiar o seguinte código abaixo e colar no arquivo divulgadores.template substituindo o {STORE_PUBLIC_ID} pelo da loja criada no painel admin do divulgadores

```html
<div id="app"><router-view></router-view></div>
<script src="https://wshlg.divulgadores.app.br/store/{STORE_PUBLIC_ID}/configs/dynamic/js"></script>
<script src="https://static.divulgadores.app.br/autoload.js"></script>
```


TatianaLoureiro = 86430f5d0f7d
Senha user admin = Tat1ana@Divulg@d0res
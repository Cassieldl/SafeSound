<!-- janela Excluir -->
<div class="modal" id="janelaExcluir" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="z-index: 13000;">
    <div class="modal-dialog modal-dialog-centered" style="width: 600px" role="document">
      <div class="modal-content">
        <div class="modal-header bg-dark" id="drag-handle">
          <h5 class="modal-title text-white" id="exampleModalLabel">Atenção</h5>
          <button id="btnfecha" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p id="oQueExcluir">Confirme exclusão de :</p>
            <p id="quemExcluir" style="font-weight: bold" ></p>
        </div>
        <div class="modal-footer bg-light-secondary">
          <button type="button" class="btn btn-danger" id="botaoExcluir">Excluir</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="botaoFechar">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
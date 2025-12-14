function carregarCombo(id, nome, tabela) {
    return $.getJSON(`combo.php?tb=${tabela}&id=${id}&nome=${nome}`, function(data) {
        const meuSelect = $('#' + id);
        meuSelect.empty();
        meuSelect.append('<option value="">Selecione um registro</option>');
        data.registros.forEach(c => {
            meuSelect.append(`<option value="${c.id}">${c.nome}</option>`);
        });
    });
}
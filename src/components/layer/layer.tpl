<div class="layer">
    <img src="${ require('../../assets/0.jpg') }" />
    <div> this is a <%= name %> layer </div>
    <% for (var i = 0; i < arr.length; i++) {  %>
        <%= arr[i] %>
    <% } %>
</div>
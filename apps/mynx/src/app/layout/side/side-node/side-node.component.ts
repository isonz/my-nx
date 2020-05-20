import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '../../layout.service';


@Component({
  selector: 'my-nx-side-node',
  templateUrl: './side-node.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SideNodeComponent implements OnInit {

  constructor(
    private layoutService: LayoutService
  ) { }

  ngOnInit() {

  }

}
